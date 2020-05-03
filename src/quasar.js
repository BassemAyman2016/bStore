import Vue from "vue";

import "./styles/quasar.scss";
import "quasar/dist/quasar.ie.polyfills";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  AddressbarColor,
  QAvatar,
  Loading,
  LoadingBar,
  QCard,
  QCardSection,
  QCardActions,
  QImg,
  QForm,
  QInput,
  Notify,
  QBadge,
  QSeparator,
  QMenu,
  ClosePopup,
  QTooltip,
  QDialog,
  QSpace,
  QExpansionItem,
  QCarousel,
  QCarouselControl,
  QCarouselSlide,
  QBtnDropdown,
  QToggle,
  QRange
} from "quasar";

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QAvatar,
    QCard,
    QCardSection,
    QCardActions,
    QImg,
    QForm,
    QInput,
    QBadge,
    QSeparator,
    QMenu,
    QTooltip,
    QDialog,
    QSpace,
    QExpansionItem,
    QCarousel,
    QCarouselControl,
    QCarouselSlide,
    QBtnDropdown,
    QToggle,
    QRange
  },
  directives: {
    ClosePopup
  },
  plugins: {
    Loading,
    LoadingBar,
    AddressbarColor,
    Notify
  },
  iconSet: iconSet
});
