namespace Nestle.CH.HQ.RSL.WebApp.Models.NewFolder
{
    public class ClearSession
    {
        private readonly RequestDelegate _next;

        //private readonly I//Logger<SessionExpiration> _//Logger;

        public ClearSession(RequestDelegate next)

        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)

        {
            try

            {

                if (!httpContext.Response.HasStarted)

                {
                    httpContext.Session.Clear();
                    httpContext.Response.Redirect("/MicrosoftIdentity/Account/SignIn");

                    return;

                }

                await _next(httpContext);

            }

            catch (Exception ex)

            {

               // _//Logger.LogError($"Error in SessionExpiration middleware: {ex}");

            }

        }

    }

}
