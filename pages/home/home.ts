import Vue from "vue";

const NavBar = () => import(
  "~/components/nav-bar/NavBar"
);

const StartAnalysis = () => import(
  "~/components/start-analysis/StartAnalysis"
);

const AnalysisList = () => import(
  "~/components/analysis-list/AnalysisList"
);

const SimpleFooter = () => import(
  "~/components/simple-footer/SimpleFooter"
)

export default Vue.extend({
  components: {
    AnalysisList,
    NavBar,
    StartAnalysis,
    SimpleFooter
  }
});
