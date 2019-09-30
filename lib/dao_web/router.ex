defmodule DaoWeb.Router do
  use DaoWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Phoenix.LiveView.Flash
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", DaoWeb do
    pipe_through :browser # Use the default browser stack
    live "/live/clock", ClockLive
    live "/", IndexLive
  end

  # Other scopes may use custom stacks.
  # scope "/api", DaoWeb do
  #   pipe_through :api
  # end
end
