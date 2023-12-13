import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, withRouter } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

import LandingPage from "@app/views/pages/LandingPage";
import ProfilePage from "@app/views/pages/ProfilePage/Wrapper";
import MenuPage from "@app/views/pages/MenuPage";
import EditProfilePage from "@app/views/pages/EditProfilePage";
import ForgetPasswordPage from "@app/views/pages/ForgetPassword";
import ForgetPasswordLinkPage from "@app/views/pages/ForgetPasswordLink";
import RegisterPage from "@app/views/pages/RegisterPage";
import Register1Page from "@app/views/pages/RegisterPage1";
import Register2Page from "@app/views/pages/RegisterPage2";
import Register3Page from "@app/views/pages/RegisterPage3";
import Register4Page from "@app/views/pages/RegisterPage4";
import MotivationPage from "@app/views/pages/MotivationPage";
import ContactUsPage from "@app/views/pages/ContactUsPage";
import ReviewPage from "@app/views/pages/ReviewPage";
import AprofPage from "@app/views/pages/AprofPage";
import MedUploadPage from "@app/views/pages/MedUploadPage";
import GenePage from "@app/views/pages/GenePage";
import NameProfilePage from "@app/views/pages/NameProfilePage";
import QrScanPage from "@app/views/pages/QrScanPage";
import PetsListPage from "@app/views/pages/PetsListPage";
import CardInputPage from "@app/views/pages/CardInputPage";
import SamplePetPage from "@app/views/pages/SamplePetPage";
import DocumentsPage from "@app/views/pages/DocumentsPage";
import ShowDocument from "@app/views/pages/ShowDocument";
import SettingsPage from "@app/views/pages/Settings";
import NotFoundPage from "@app/views/pages/NotFoundPage";

import { handShake } from "@app/actions/auth";
import AddPetFlow from "@app/views/pages/AddPetFlow";
import UpdatePetID from "@app/views/pages/UpdatePetID";

const AppRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    handShake();
  }, []);

  return (
    <Switch>
      <PublicRoute exact path="/" component={LandingPage} />
      <PublicRoute exact path="/sample" component={SamplePetPage} />
      <PublicRoute exact path="/contact-us" component={ContactUsPage} />

      <PublicRoute exact path="/review" component={ReviewPage} />

      <PublicRoute exact path="/medupload" component={MedUploadPage} />

      <PublicRoute exact path="/a" component={ProfilePage} />

      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/petflow"
        component={AddPetFlow}
      />

      <RestrictedRoute
        authed={isLoggedIn}
        exact
        path="/auth"
        component={RegisterPage}
      />
      <RestrictedRoute
        authed={isLoggedIn}
        exact
        path="/forget-password"
        component={ForgetPasswordPage}
      />
      <RestrictedRoute
        authed={isLoggedIn}
        exact
        path="/forget-password-link"
        component={ForgetPasswordLinkPage}
      />

      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/menu"
        component={MenuPage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/register1"
        component={Register1Page}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/register2"
        component={Register2Page}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/register3"
        component={Register3Page}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/register4"
        component={Register4Page}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/motivation"
        component={MotivationPage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/edit-profile"
        component={EditProfilePage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/update-pet-id"
        component={UpdatePetID}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/aprof"
        component={AprofPage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/gene"
        component={GenePage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/name-profile"
        component={NameProfilePage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/petsList"
        component={PetsListPage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/card-input"
        component={CardInputPage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/settings"
        component={SettingsPage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/documents"
        component={DocumentsPage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/scan"
        component={QrScanPage}
      />
      <PrivateRoute
        authed={isLoggedIn}
        exact
        path="/show-document"
        component={ShowDocument}
      />

      <PublicRoute path="**" component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(AppRoutes);
