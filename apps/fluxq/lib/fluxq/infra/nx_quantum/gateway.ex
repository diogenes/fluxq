defmodule FluxQ.Infra.NxQuantum.Gateway do
  @moduledoc """
  NxQuantum adapter for `FluxQ.Ports.NxQuantumGateway`.

  Delegates to `NxQuantum.ProviderBridge` and `NxQuantum.ProviderBridge.Serialization` only. No provider SDK
  semantics are interpreted here; provider failures arrive as NxQuantum's typed error envelopes.
  """

  @behaviour FluxQ.Ports.NxQuantumGateway

  alias NxQuantum.ProviderBridge
  alias NxQuantum.ProviderBridge.Job
  alias NxQuantum.ProviderBridge.Serialization

  @impl true
  def decode(envelope) when is_map(envelope), do: Serialization.from_external_map(envelope)

  @impl true
  def resume(envelope, adapter, opts) when is_map(envelope) and is_atom(adapter) do
    case Serialization.from_external_map(envelope) do
      {:ok, %Job{} = job} -> ProviderBridge.poll_job(adapter, job, opts)
      {:ok, other} -> {:ok, other}
      {:error, _} = error -> error
    end
  end
end
