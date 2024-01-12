import Vue from "vue";

const NavBar = () => import(
  "~/components/nav-bar/NavBar"
);

const StartReport = () => import(
  "~/components/start-report/StartReport"
)

export default Vue.extend({
  components: {
    NavBar,
    StartReport
  }
});
