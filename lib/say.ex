defmodule Say do
  def say(raw) do
    cond do
      String.match?(raw, ~r{「.*?」}) ->
        do_say(raw)
      String.match?(raw, ~r{\".*?\"}) ->
        do_say(raw)
      true ->
        ""
    end
  end

  def do_say(raw), do: get_payload(raw)

  def get_payload(<<"「", rest::binary>>) do
    remaining = byte_size(get_payload(rest, 0))
    binary_part(rest, 0, byte_size(rest) - remaining)
  end
  def get_payload(<<"\"", rest::binary>>) do
    remaining = byte_size(get_payload(rest, 0))
    binary_part(rest, 0, byte_size(rest) - remaining)
  end
  def get_payload(<<_::utf8, rest::binary>>), do: get_payload(rest)

  def get_payload(<<"\"", _::binary>> = rest, 0), do: rest
  def get_payload(<<"」", _::binary>> = rest, 0), do: rest
  def get_payload(<<"」", rest::binary>>, n), do: get_payload(rest, n - 1)
  def get_payload(<<"「", rest::binary>>, n), do: get_payload(rest, n + 1)
  def get_payload(<<"\"", rest::binary>>, n), do: get_payload(rest, n - 1)
  def get_payload(<<_::utf8, rest::binary>>, n), do: get_payload(rest, n)
end
