defmodule FluxQ.Application.EnvelopeSummary do
  @moduledoc """
  Pure projection of an NxQuantum envelope into the facts operator surfaces need.

  Domain facts only: kind, state, provider, lane (`fixture`, `live_smoke`, `live`), and typed error details.
  Provider SDK payloads are never copied into the summary.
  """

  @spec describe(map()) :: map()
  def describe(%{"type" => "job"} = envelope) do
    %{
      kind: :job,
      id: envelope["id"],
      state: envelope["state"],
      provider: envelope["provider"],
      lane: lane(envelope),
      attention: attention(envelope["state"])
    }
  end

  def describe(%{"type" => "result"} = envelope) do
    %{
      kind: :result,
      id: envelope["job_id"],
      state: envelope["state"],
      provider: envelope["provider"],
      lane: lane(envelope),
      attention: :none
    }
  end

  def describe(%{"type" => "error"} = envelope) do
    %{
      kind: :error,
      id: envelope["request_id"],
      code: envelope["code"],
      operation: envelope["operation"],
      provider: envelope["provider"],
      lane: lane(envelope),
      attention: :blocked
    }
  end

  def describe(_other), do: %{kind: :unknown, attention: :blocked}

  defp lane(%{"metadata" => %{"transport" => %{"mode" => mode}}}) when is_binary(mode), do: mode
  defp lane(_envelope), do: "unknown"

  defp attention(state) when state in ["failed", "cancelled"], do: :blocked
  defp attention(state) when state in ["submitted", "queued", "running"], do: :in_progress
  defp attention(_state), do: :none
end
