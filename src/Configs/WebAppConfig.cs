using System;
using System.Collections.Generic;
using Autofac;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using System.Configuration.Abstractions;
using System.IO;
using Owin;
using Serilog;

namespace GitCheese.Client.Web.Configs
{
    public class WebAppConfig
    {
        public static Action<IAppBuilder> Config(string url)
        {
            return Configure;
        }

        private static void Configure(IAppBuilder appBuilder)
        {
            appBuilder.Use<ServiceRequestInterceptor>(Log.Logger);
            foreach (var option in GetFileServerOptions())
            {
                appBuilder.UseFileServer(option);
            }
        }

        private static FileServerOptions[] GetFileServerOptions()
        {
            var result = new List<FileServerOptions>();

            var rootDirectory = ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.root-directory", () => ".\app");
            var defaultDocument = ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.default-document", () => "index.html");

            var rootOptions = new FileServerOptions
            {
                EnableDefaultFiles = true,
                FileSystem = new PhysicalFileSystem(rootDirectory)
            };
            rootOptions.StaticFileOptions.ServeUnknownFileTypes = true;
            rootOptions.DefaultFilesOptions.DefaultFileNames = new[] { defaultDocument };
            result.Add(rootOptions);

            if (Directory.Exists(@".\..\..\bower_components"))
            {
                var bowerOptions = new FileServerOptions
                {
                    FileSystem = new PhysicalFileSystem(@".\..\..\bower_components"),
                    RequestPath = new PathString("/bower_components")
                };
                bowerOptions.StaticFileOptions.ServeUnknownFileTypes = true;
                result.Add(bowerOptions);
            }
            return result.ToArray();
        }
    }
}
