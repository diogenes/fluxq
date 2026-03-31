defmodule FluxQWeb.PageController do
  use FluxQWeb, :controller

  def home(conn, _params) do
    conn
    |> assign(:page_title, "FluxQ Overview")
    |> assign_prop(:page_title, "FluxQ Overview")
    |> assign_prop(:runtime_profile, "fixture")
    |> assign_prop(:supported_lanes, ["fixture", "live_smoke", "live"])
    |> render_inertia("DashboardPage")
  end
end
