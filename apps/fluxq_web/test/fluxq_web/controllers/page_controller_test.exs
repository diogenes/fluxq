defmodule FluxQWeb.PageControllerTest do
  use FluxQWeb.ConnCase

  test "GET / renders the Inertia dashboard shell", %{conn: conn} do
    conn = get(conn, ~p"/")
    body = html_response(conn, 200)

    assert body =~ "DashboardPage"
    assert body =~ "FluxQ Overview"
    assert body =~ "fixture"
    assert body =~ "live_smoke"
    assert body =~ "live"
  end
end
