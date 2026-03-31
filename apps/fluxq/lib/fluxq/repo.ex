defmodule FluxQ.Repo do
  use Ecto.Repo,
    otp_app: :fluxq,
    adapter: Ecto.Adapters.Postgres
end
