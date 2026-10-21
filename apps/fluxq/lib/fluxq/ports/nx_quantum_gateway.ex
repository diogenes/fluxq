defmodule FluxQ.Ports.NxQuantumGateway do
  @moduledoc """
  Application port for NxQuantum provider execution and envelope resume.

  Application code depends on this behaviour only. The NxQuantum adapter lives in `FluxQ.Infra.NxQuantum.Gateway`.
  Envelopes cross this boundary unchanged: FluxQ never reshapes NxQuantum maps.
  """

  @type envelope :: map()
  @type adapter :: module()
  @type typed_error :: map() | struct()

  @doc "Decodes a stored `v1` envelope map into a typed NxQuantum struct."
  @callback decode(envelope()) :: {:ok, struct()} | {:error, map()}

  @doc "Resumes a stored job envelope by polling it through the provider adapter."
  @callback resume(envelope(), adapter(), keyword()) :: {:ok, struct()} | {:error, typed_error()}
end
