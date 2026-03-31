defmodule FluxQ.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {DNSCluster, query: Application.get_env(:fluxq, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: FluxQ.PubSub}
      # Start a worker by calling: FluxQ.Worker.start_link(arg)
      # {FluxQ.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: FluxQ.Supervisor)
  end
end
