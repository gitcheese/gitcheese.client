using Microsoft.Owin.Hosting;
using Microsoft.Owin.StaticFiles;
using Owin;
using Serilog;
using System;
using System.Collections.Generic;
using System.Configuration.Abstractions;

namespace GitCheese.Client.Web
{
    public class Service
    {
        public Service(IEnumerable<FileServerOptions> options, IAppSettings appSettings)
        {
            this.options = options;
            this.appSettings = appSettings;
        }

        private IDisposable app;
        private IEnumerable<FileServerOptions> options;
        private IAppSettings appSettings;

        public void Start()
        {
            Log.Information("Starting WebApp");
            var url = appSettings.AppSetting("gitcheese.client.web.url", () => "http://+:9000/app");

            app = WebApp.Start(url, appBuilder =>
            {
                appBuilder.Use<ServiceRequestInterceptor>(Log.Logger);
                foreach (var option in this.options)
                {
                    appBuilder.UseFileServer(option);
                }
            });

            Log.Information("WebApp Started");
        }

        public void Stop()
        {
            app.Dispose();
            Log.Information("WebApp Stoped");
        }
    }
}
