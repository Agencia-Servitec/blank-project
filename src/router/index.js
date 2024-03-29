import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../components/public";
import { AdminLayout } from "../components/admin";
import { PrivateRoute } from "./PrivateRoute";
import {
  FlipBookPage,
  FlipBookPages,
  User,
  Users,
  CustomersIntegration,
  CustomerIntegration,
  Login,
  Page404,
    VisitorsIntegration,
    VisitorIntegration,
    UsersIntegration,
  PhotosIntegration,
    PostsIntegration,
    ProviderIntegration,
    ProvidersIntegration,
} from "../pages";

export const Router = () => (
  <Routes>
    <Route
      exact
      path="/"
      element={
        <AdminLayout>
          <FlipBookPages />
        </AdminLayout>
      }
    />
    <Route exact path="/login" element={<Login />} />
    {/********************ADMIN ROUTES****************/}
    <Route
      exact
      path="/admin/users"
      element={
        <AdminLayout>
          <Users />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/users/:userId"
      element={
        <PrivateRoute>
          <AdminLayout>
            <User />
          </AdminLayout>
        </PrivateRoute>
      }
    />
    <Route
      exact
      path="/admin"
      element={
        <AdminLayout>
          <FlipBookPages />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/flip-book-pages"
      element={
        <AdminLayout>
          <FlipBookPages />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/flip-book-pages/:flipBookPageId"
      element={
        <AdminLayout>
          <FlipBookPage />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/visitors"
      element={
        <AdminLayout>
          <VisitorsIntegration />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/usersApi"
      element={
        <AdminLayout>
          <UsersIntegration />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/visitors/:visitorId"
      element={
        <AdminLayout>
          <VisitorIntegration />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/customers"
      element={
        <AdminLayout>
          <CustomersIntegration />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/customers/:customerId"
      element={
        <AdminLayout>
          <CustomerIntegration />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/photos"
      element={
        <AdminLayout>
          <PhotosIntegration />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/providers"
      element={
        <AdminLayout>
          <ProvidersIntegration />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/providers/:providerId"
      element={
        <AdminLayout>
          <ProviderIntegration />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="/admin/posts"
      element={
        <AdminLayout>
          <PostsIntegration />
        </AdminLayout>
      }
    />
    <Route
      exact
      path="*"
      element={
        <BaseLayout>
          <Page404 />
        </BaseLayout>
      }
    />
  </Routes>
);
