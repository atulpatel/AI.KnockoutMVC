using System.Web.Optimization;

[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(AI.KnockoutMVC.Web.AiKnockoutMvcConfig), "RegisterBundles")]
namespace AI.KnockoutMVC.Web
{
    public static class AiKnockoutMvcConfig
    {
        public static void RegisterBundles()
        {
            var bundles = BundleTable.Bundles;
            bundles.Add(new ScriptBundle("~/bundles/knockoutMVC").Include(
                "~/scripts/knockout-{version}.js",
                "~/scripts/utilities/*.js",
               "~/scripts/knockoutMVC/*.js",
               "~/scripts/viewModels/*.js"
               ));

            var bundleOrder = new BundleFileSetOrdering("KnockoutMVCBundleOrder");
            bundleOrder.Files.Add("knockout-{version}.js");
            bundleOrder.Files.Add("namespace*");
            bundleOrder.Files.Add("knockoutMvc");
            

            BundleTable.Bundles.FileSetOrderList.Add(bundleOrder);
        }
    }
}