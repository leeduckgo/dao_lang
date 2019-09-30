defmodule Compiler do
  def compile(input_data) do
    input_data
    |> parse(:lines)
  end

  def parse(raw, :lines) do
    raw
    |> String.split(["\n"])
    |> Enum.reject(&(is_nil(&1)))
    |> Enum.map(&(parse(&1, :line)))
  end

  def parse(raw, :line) do
    raw
    |> String.split(" ", parts: 2)
    |> handle()
  end


  def handle([header, others])
   when header == "曰" do
    Say.say(others)
  end
  def handle(_) do
    ""
  end
end
