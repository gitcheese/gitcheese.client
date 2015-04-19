using Autofac;
using Serilog;

namespace GitCheese.Client.Web.Configs
{
    public static class LogConfig
    {
        public static void Config(IContainer container)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.ColoredConsole()
                .WriteTo.Trace()
                .CreateLogger();

            var containerUpdater = new ContainerBuilder();
            containerUpdater.Register(c => Log.Logger);
            containerUpdater.Update(container);
        }
    }
}
