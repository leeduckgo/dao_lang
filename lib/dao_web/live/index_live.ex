defmodule DaoWeb.IndexLive do
  use Phoenix.LiveView

  @init_input "曰 「道可道」\n曰 \"非常道\""
  def render(assigns) do
    ~L"""
      <style>
      #input {
        float:left;
        height: 500px;
        width: 500px;
        /* border: 1px solid #FF0099;*/
      }
      #to {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 500px;
        width: 100px;
        text-align: center;
        float:left;
        /* border: 1px solid #FF0099;*/
      }
      #result {
        float:left;
        width: 400px;
        height: 485px;
        border: 2px solid #000000;
      }
      #header {
        text-align: center;
      }
      </style>
        <div id = "header">
          <h1>道 1.0 在线炼制器</h1>
        </div>
        <div>
          <div id="input">
            <form phx-change="update">
              <textarea rows="20" cols="60" name="input_data"><%=@input_data%></textarea>
            </form>
          </div>
          <div id = "to" >
            <p><h5>「炼」<br>☞☞☞<br>「炼」</h5></p>
          </div>
          <div id="result">
            <%=for i <- @result do %>
              <%=i %>
              <br>
            <%end%>
          </div>
        <div>
    """
  end

  def mount(_session, socket) do
    if connected?(socket), do: :timer.send_interval(1000, self(), :tick)
    inited_socket = init(socket)

    {:ok, inited_socket}
  end

  def handle_info(:tick, socket) do
    {:noreply, socket}
  end

  def handle_event("update", %{"input_data" => input_data}, socket) do
    res = Compiler.compile(input_data)
    updated_socket =
      update(socket, :result, &(&1 = res))
    {:noreply, updated_socket}
  end

  def handle_event("nav", _path, socket) do
    {:noreply, socket}
  end

  def init(socket) do
    init_input = @init_input
    socket
    |> assign(input_data: init_input)
    |> assign(result: Compiler.compile(init_input))
  end
end
