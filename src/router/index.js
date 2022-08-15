import { Route, Routes } from 'react-router-dom'
import { Categories } from '../pages/categories/Categories';
import { Pictograms } from '../pages/pictograms/Pictograms';
import { Routines } from '../pages/routines/Routines';
import { Login } from '../pages/login/Login';
import { Routine } from '../pages/routine/Routine'
import { Workspace } from '../layouts/workspace';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path='/admin'
        element={<Login />} />
      <Route index='/categories' element={<Workspace /> }>
        <Route
          path='/categories'
          element={<Categories />} />
        <Route
          path='/pictograms'
          element={<Pictograms/>} />
        <Route
          path='/routines'
          element={<Routines />} />
        <Route
          path='/routine'
          element={<Routine />} />
      </Route>
    </Routes>
  )
}
