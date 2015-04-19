using GitCheese.Client.Web.Configs;
using Serilog.Extras.Topshelf;
using System.Configuration.Abstractions;
using Topshelf;
using Topshelf.Autofac;

namespace GitCheese.Client.Web
{
    class Program
    {
        public static void Main(string[] args)
        {
            var container = ContainerConfig.Config();
            LogConfig.Config(container);
            FileServerOptionsConfig.Config(container);

            HostFactory.Run(c =>
            {
                c.UseSerilog();
                c.UseAutofacContainer(container);
                c.SetServiceName(ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.service.name"));
                c.SetDisplayName(ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.service.display-name"));
                c.SetDescription(ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.service.description"));

                c.Service<Service>(cfg =>
                {
                    cfg.ConstructUsingAutofacContainer();
                    cfg.WhenStarted((service) => service.Start());
                    cfg.WhenStopped((service) => service.Stop());
                });
            });
        }
    }
}
