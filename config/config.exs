# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :dao,
  ecto_repos: [Dao.Repo]

# Configures the endpoint
config :dao, DaoWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "4YMxS1g6Us4iov4kQT0xPrHyiQStSczSIJipNcVAhRb/Tg6TnzWZ6187qxCqUKCj",
  render_errors: [view: DaoWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Dao.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
