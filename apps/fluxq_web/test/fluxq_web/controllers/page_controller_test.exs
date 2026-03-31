defmodule FluxQWeb.PageControllerTest do
  use FluxQWeb.ConnCase

  test "GET / renders the Inertia workspace shell", %{conn: conn} do
    conn = get(conn, ~p"/")
    body = html_response(conn, 200)

    assert body =~ "FluxQWorkspacePage"
    assert body =~ "FluxQ Overview"
    assert body =~ "fixture"
    assert body =~ "live_smoke"
    assert body =~ "live"
  end
end
