using GitCheese.Client.Web.Configs;
using Serilog.Extras.Topshelf;
using System.Configuration.Abstractions;
using Topshelf;

namespace GitCheese.Client.Web
{
    class Program
    {
        public static void Main(string[] args)
        {
            LogConfig.Config();

            HostFactory.Run(c =>
            {
                c.Service<Service>(cfg =>
                {
                    cfg.ConstructUsing(() => new Service());
                    cfg.WhenStarted((service) => service.Start());
                    cfg.WhenStopped((service) => service.Stop());
                });
                c.UseSerilog();
                c.SetServiceName(ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.service.name"));
                c.SetDisplayName(ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.service.display-name"));
                c.SetDescription(ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.service.description"));
            });
        }
    }
}
