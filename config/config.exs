# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of the Config module.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
import Config

# Configure Mix tasks and generators
config :fluxq,
  namespace: FluxQ,
  ecto_repos: [FluxQ.Repo]

# Configure the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :fluxq, FluxQ.Mailer, adapter: Swoosh.Adapters.Local

config :fluxq_web,
  namespace: FluxQWeb,
  ecto_repos: [FluxQ.Repo],
  generators: [context_app: :fluxq]

# Configures the endpoint
config :fluxq_web, FluxQWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [html: FluxQWeb.ErrorHTML, json: FluxQWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: FluxQ.PubSub,
  live_view: [signing_salt: "9rOvIfsw"]

config :inertia,
  endpoint: FluxQWeb.Endpoint,
  static_paths: [],
  default_version: "1",
  camelize_props: true

config :vite_phx,
  release_app: :fluxq_web,
  environment: config_env(),
  dev_server_address: "http://localhost:5173",
  vite_manifest: "priv/static/assets/.vite/manifest.json",
  phx_manifest: "priv/static/cache_manifest.json"

# Configure Elixir's Logger
config :logger, :default_formatter,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
