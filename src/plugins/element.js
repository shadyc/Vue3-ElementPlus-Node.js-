import { ElButton, ElContainer, ElHeader, ElAside, ElMain, ElMenu, ElMenuItem, ElSubmenu, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

export default (app) => {
  app.use(ElButton)
  app.use(ElContainer)
  app.use(ElHeader)
  app.use(ElAside)
  app.use(ElMain)
  app.use(ElMenu)
  app.use(ElSubmenu)
  app.use(ElMenuItem)
  app.use(ElSubmenu)
  app.use(ElBreadcrumb)
  app.use(ElBreadcrumbItem)
}
