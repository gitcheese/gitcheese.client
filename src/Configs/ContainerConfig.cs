using Autofac;
using System.Configuration.Abstractions;
using Serilog;

namespace GitCheese.Client.Web.Configs
{
    public static class ContainerConfig
    {
        public static IContainer Config()
        {
            var builder = new ContainerBuilder();
            builder.Register(c => ConfigurationManager.Instance.AppSettings).As<IAppSettings>();
            builder.RegisterType<Service>().AsSelf();

            builder.Register(_ => Log.Logger).As<ILogger>();

            return builder.Build();
        }
    }
}
