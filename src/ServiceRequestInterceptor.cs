using Microsoft.Owin;
using Serilog;
using System.Threading.Tasks;
using System.Linq;

namespace GitCheese.Client.Web
{
    public class ServiceRequestInterceptor : OwinMiddleware
    {
        public ServiceRequestInterceptor(OwinMiddleware next, ILogger logger)
            : base(next)
        {
            this.logger = logger;
        }

        private ILogger logger;

        public async override Task Invoke(IOwinContext context)
        {
            await Next.Invoke(context);
            if (!new[] { 200, 304 }.Contains(context.Response.StatusCode))
                logger.Warning("[{status}][{ip}][{method}]{path}", context.Response.StatusCode, context.Request.RemoteIpAddress, context.Request.Method, context.Request.Path);
            else
                logger.Information("[{status}][{ip}][{method}]{path}", context.Response.StatusCode, context.Request.RemoteIpAddress, context.Request.Method, context.Request.Path);
        }
    }
}
