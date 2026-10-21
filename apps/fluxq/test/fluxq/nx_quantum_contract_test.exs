defmodule FluxQ.NxQuantumContractTest do
  @moduledoc """
  G2 gate: FluxQ consumes NxQuantum envelopes unchanged.

  Reads NxQuantum's golden snapshots through the path dependency (single source of truth, no copies).
  If NxQuantum changes an envelope shape without a `schema_version` bump, the snapshot test fails there first.
  """

  use ExUnit.Case, async: true

  alias FluxQ.Application.EnvelopeSummary
  alias FluxQ.Infra.NxQuantum.Gateway
  alias NxQuantum.Adapters.Providers.AwsBraket
  alias NxQuantum.Adapters.Providers.AzureQuantum
  alias NxQuantum.Adapters.Providers.GoogleQuantumAI
  alias NxQuantum.Adapters.Providers.IBMRuntime
  alias NxQuantum.ProviderBridge.Job
  alias NxQuantum.ProviderBridge.Serialization

  @snapshot_dir Path.join(
                  Mix.Project.deps_paths()[:nx_quantum],
                  "test/fixtures/contracts/envelopes"
                )

  # Mirrors NxQuantum.TestSupport.ProviderMatrix (test-only module, not available here).
  @providers %{
    "ibm_runtime" =>
      {IBMRuntime, "ibm_backend_simulator",
       %{auth_token: "ibm-token", channel: "ibm_cloud", backend: "ibm_backend_simulator"}},
    "aws_braket" =>
      {AwsBraket, "arn:aws:braket:::device/quantum-simulator/amazon/sv1",
       %{
         region: "us-east-1",
         credentials_profile: "default",
         device_arn: "arn:aws:braket:::device/quantum-simulator/amazon/sv1"
       }},
    "azure_quantum" =>
      {AzureQuantum, "azure.quantum.sim",
       %{
         workspace: "ws-1",
         auth_context: "managed_identity",
         target_id: "azure.quantum.sim",
         provider_name: "microsoft"
       }},
    "google_quantum_ai" =>
      {GoogleQuantumAI, "projects/example/locations/us-central1/processors/rainbow",
       %{
         auth_token: "google-token",
         project_id: "example",
         location: "us-central1",
         processor_id: "projects/example/locations/us-central1/processors/rainbow"
       }}
  }

  test "snapshot directory is available from the NxQuantum path dependency" do
    assert File.dir?(@snapshot_dir), "missing #{@snapshot_dir}"
    assert length(File.ls!(@snapshot_dir)) == 12
  end

  for file <- ~w(ibm_runtime aws_braket azure_quantum google_quantum_ai) do
    test "#{file}: stored envelopes decode and re-encode unchanged" do
      for kind <- ~w(job result error) do
        map = read(unquote(file), kind)

        assert {:ok, decoded} = Gateway.decode(map)
        assert Serialization.to_external_map(decoded) == map
        refute EnvelopeSummary.describe(map).kind == :unknown
      end
    end
  end

  for file <- ~w(ibm_runtime aws_braket azure_quantum google_quantum_ai) do
    test "#{file}: a stored job resumes through the gateway with its id intact" do
      map = read(unquote(file), "job")
      {adapter, target, config} = Map.fetch!(@providers, unquote(file))
      opts = [target: target, provider_config: config]

      assert {:ok, %Job{} = resumed} = Gateway.resume(map, adapter, opts)
      assert resumed.id == map["id"]
    end
  end

  test "unsupported schema versions surface NxQuantum's typed error unchanged" do
    map = read("ibm_runtime", "job")

    assert {:error, %{code: :unsupported_envelope_schema_version, supported: ["v1"]}} =
             Gateway.resume(%{map | "schema_version" => "v9"}, IBMRuntime, [])
  end

  test "summary exposes lane and typed failure without provider payloads" do
    job = read("ibm_runtime", "job")
    error = read("ibm_runtime", "error")

    assert %{kind: :job, lane: "fixture", provider: "ibm_runtime"} = EnvelopeSummary.describe(job)

    assert %{kind: :error, code: "provider_rate_limited", operation: "poll", attention: :blocked} =
             EnvelopeSummary.describe(error)
  end

  defp read(provider_id, kind) do
    @snapshot_dir
    |> Path.join("#{provider_id}.#{kind}.json")
    |> File.read!()
    |> Jason.decode!()
  end
end
