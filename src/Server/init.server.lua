--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ModuleLoader = require(ReplicatedStorage.TS.ModuleLoader)

-- you can optionally modify settings (also change it via the attributes on ModuleLoader)
ModuleLoader.ChangeSettings({
	YIELD_THRESHOLD = 10,
	VERBOSE_LOADING = true,
	WAIT_FOR_SERVER = true
})
-- pass any containers for your custom services to the Start() function
ModuleLoader.Start(script.Services)