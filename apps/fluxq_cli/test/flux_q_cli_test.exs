defmodule FluxQCliTest do
  use ExUnit.Case
  doctest FluxQCli

  test "greets the world" do
    assert FluxQCli.hello() == :world
  end
end
