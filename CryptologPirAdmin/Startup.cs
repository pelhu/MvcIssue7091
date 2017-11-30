using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using CryptologPirAdmin.Helpers;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace CryptologPirAdmin
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
        }

        //public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc(config =>
            {
                var policy = new AuthorizationPolicyBuilder()
                             .RequireAuthenticatedUser()
                             .Build();
                config.Filters.Add(new AuthorizeFilter(policy));
            });//.AddRazorOptions(options => options.ParseOptions = options.ParseOptions.WithLanguageVersion(LanguageVersion.CSharp7));
            

            // Adds a default in-memory implementation of IDistributedCache.
            services.AddDistributedMemoryCache();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSession(options =>
            {
                // Set a short timeout for easy testing.
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                //options.CookieHttpOnly = true;
            });

            services.AddMemoryCache();
            //services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            //            .AddCookie(o =>
            //            {
            //                o.LoginPath = new PathString("/login");
            //            });
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                        .AddCookie(options => {
                            options.LoginPath = "/login";
                        });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseAuthentication();

            app.UseSession();
            
            loggerFactory.AddConsole(LogLevel.Critical);
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseBrowserLink();
            }
            else
            {
                //app.UseExceptionHandler("/Home/Error");   
                app.UseExceptionHandler(new ExceptionHandlerOptions
                {                    
                    ExceptionHandler = async context =>
                    {
                        var ehf = context.Features.Get<IExceptionHandlerPathFeature>();

                        await context.Response.WriteAsync($"Error: {ehf.Error.Message}");
                    }
                });          
            }

            var supportedCultures = new[]
               {
                   new CultureInfo("tr-Tr")
               };

            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("tr-Tr"),
                // Formatting numbers, dates, etc.
                SupportedCultures = supportedCultures,
                // UI strings that we have localized.
                SupportedUICultures = supportedCultures
            });

            app.UseStaticFiles();

            app.UseMvcWithDefaultRoute();

            /*app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });*/

        }
    }
}
