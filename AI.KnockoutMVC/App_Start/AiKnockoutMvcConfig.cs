using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace AI.KnockoutMVC
{
    public static class AiKnockoutMvcConfig
    {
        public static void RegisterBundles()
        {
            var bundles = BundleTable.Bundles;
            bundles.Add(new ScriptBundle("~/bundles/knockoutMVC").Include(
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