using Microsoft.AspNetCore.Localization;
using Nestle.CH.HQ.RSL.WebApp.Services;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
// Register localization services
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources"); // Optional path for resource files

// Register other services
builder.Services.AddSingleton<LanguageService>();  // Register LanguageService

builder.Services.AddControllersWithViews();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configure localization middleware
var supportedCultures = new[] { "en-US", "fr-FR" };  // Add supported cultures
app.UseRequestLocalization(new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture("en-US"),
    SupportedCultures = supportedCultures.Select(c => new CultureInfo(c)).ToArray(),
    SupportedUICultures = supportedCultures.Select(c => new CultureInfo(c)).ToArray(),
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Trips}/{action=Index}/{id?}");

app.Run();
