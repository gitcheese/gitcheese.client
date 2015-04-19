using Autofac;
using System;
using System.Configuration.Abstractions;
using System.Linq;

namespace GitCheese.Client.Web.Configs
{
    public static class ContainerConfig
    {
        public static IContainer Config()
        {
            var appAssemblies = AppDomain.CurrentDomain.GetAssemblies()
                   .Where(a => a.GetName().Name.StartsWith("gitcheese", StringComparison.InvariantCultureIgnoreCase))
                   .ToArray();

            var builder = new ContainerBuilder();

            builder.RegisterAssemblyTypes(appAssemblies).AsImplementedInterfaces();

            builder.RegisterType<Service>().AsSelf();
            builder.Register(ctx => ConfigurationManager.Instance.ConnectionStrings);
            builder.Register(ctx => ConfigurationManager.Instance.AppSettings);

            var container = builder.Build();
            return container;
        }
    }
}
