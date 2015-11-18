using Microsoft.Owin.Hosting;
using Microsoft.Owin.StaticFiles;
using Owin;
using Serilog;
using System;
using System.Collections.Generic;
using System.Configuration.Abstractions;
using Autofac;
using GitCheese.Client.Web.Configs;

namespace GitCheese.Client.Web
{
    public class Service
    {
        private IDisposable _app;

        public void Start()
        {
            var url = ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.url", () => "http://+:9000/app");

            ContainerConfig.Config();

            Action<IAppBuilder> startup = WebAppConfig.Config(url);
            _app = WebApp.Start(url, startup);
        }

        public void Stop()
        {
            _app.Dispose();
        }
    }
}
