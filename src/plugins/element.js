import {ElTableColumn, ElTable, ElButton, ElContainer, ElSwitch, ElHeader, ElAside, ElMain, ElMenu, ElMenuItem, ElSubmenu, ElBreadcrumb, ElBreadcrumbItem, ElCard, ElInput, ElCol, ElRow} from 'element-plus'

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
  app.use(ElCard)
  app.use(ElInput)
  app.use(ElCol)
  app.use(ElRow)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElSwitch)
}
