import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import {AdminLayout} from '../layouts/AdminLayout';
import {AuthLayout} from '../layouts/AuthLayout';
import {ArticleEdit} from '../pages/ArticleEdit';
import {ArticleList} from '../pages/ArticleList';
import {InformationEdit} from '../pages/InformationEdit';
import {Login} from '../pages/Login';
import {Register} from '../pages/Register';

const Redirect: React.FC<{ to: string }> = props => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(props.to);
  }, []);
  return null;
};

const BaseRouter = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Redirect to="/admin/article-list"/>}>
          </Route>
          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="article-list" element={<ArticleList/>}></Route>
            <Route path="article-edit" element={<ArticleEdit/>}></Route>
            <Route path="information-edit" element={<InformationEdit/>}></Route>
          </Route>
          <Route path="/auth" element={<AuthLayout/>}>
            <Route path="login" element={<Login/>}></Route>
            <Route path="register" element={<Register/>}></Route>
          </Route>
        </Routes>
      </Router>
  );
};

export default BaseRouter;
