using System.Configuration.Abstractions;
using Serilog;

namespace GitCheese.Client.Web.Configs
{
    public static class LogConfig
    {
        public static void Config()
        {
            Log.Logger = new LoggerConfiguration()
               .WriteTo.ColoredConsole()
               .WriteTo.Trace()
               .WriteTo.RollingFile(ConfigurationManager.Instance.AppSettings["logs.file"])
               .MinimumLevel.Debug()
               .CreateLogger();
        }
    }
}
