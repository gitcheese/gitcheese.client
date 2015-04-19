using Autofac;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using System.Configuration.Abstractions;
using System.IO;

namespace GitCheese.Client.Web.Configs
{
    public static class FileServerOptionsConfig
    {
        public static void Config(IContainer container)
        {
            var containerUpdater = new ContainerBuilder();
            var rootDirectory = ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.root-directory", () => @".\App");
            var defaultDocument = ConfigurationManager.Instance.AppSettings.AppSetting("gitcheese.client.web.default-document", () => "index.html");

            var rootOptions = new FileServerOptions
            {
                EnableDefaultFiles = true,
                FileSystem = new PhysicalFileSystem(rootDirectory)
            };
            rootOptions.StaticFileOptions.ServeUnknownFileTypes = true;
            rootOptions.DefaultFilesOptions.DefaultFileNames = new[] { defaultDocument };
            containerUpdater.RegisterInstance(rootOptions).As<FileServerOptions>();

            if (Directory.Exists(@".\..\..\bower_components"))
            {
                var bowerOptions = new FileServerOptions
                {
                    FileSystem = new PhysicalFileSystem(@".\..\..\bower_components"),
                    RequestPath = new PathString("/bower_components")
                };
                bowerOptions.StaticFileOptions.ServeUnknownFileTypes = true;
                containerUpdater.RegisterInstance(bowerOptions).As<FileServerOptions>();
            }

            containerUpdater.Update(container);
        }
    }
}
