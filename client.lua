-- Shuts down the loadscreen once the client has finished loading.
CreateThread(function()
    while not NetworkIsSessionStarted() do
        Wait(100)
    end

    ShutdownLoadingScreenNui()
end)
