
### **企业多产品文档中心项目技术设计文档**

**版本:** 1.0
**日期:** 2025年11月1日
**关联需求文档:** 企业多产品文档中心项目需求规格说明书

#### **1. 系统概述**

**1.1 设计目标**
本文档旨在为“企业多产品文档中心”项目提供具体的技术实现蓝图。它将详细说明如何利用 Docusaurus 框架的核心功能，构建一个满足多产品、多版本、多语言需求的、可扩展且易于维护的文档平台。

**1.2 技术选型**
*   **核心框架:** **Docusaurus (v3.x)**。选择理由：
    *   **插件化架构:** 其“文档插件实例”机制完美匹配多产品文档隔离的需求 (FR-1.2)。
    *   **内置版本控制:** 提供成熟的、命令式的文档版本管理功能 (FR-2)。
    *   **强大的国际化(i18n):** 原生支持多语言内容管理和同步切换 (FR-3)。
    *   **React驱动:** 便于未来进行深度定制和功能扩展。
    *   **生态成熟:** 社区活跃，拥有丰富的插件和主题。
*   **内容格式:** **Markdown (MDX)**。便于文档团队编写和维护。
*   **运行环境:** **Node.js (LTS 版本)**。
*   **部署目标:** 任意静态网站托管服务 (如 Vercel, Netlify, GitHub Pages, AWS S3 等)。

#### **2. 系统架构**

**2.1 高层架构**
本系统是一个基于 Docusaurus 构建的静态网站。其核心架构围绕“配置驱动”和“内容分离”的原则。

*   **配置中心 (`docusaurus.config.js`):** 定义整个站点的结构，包括注册哪些产品、每个产品的路由、版本策略、导航栏和国际化配置。
*   **内容源 (`/docs`):** 存放所有产品的默认版本（或当前正在开发的版本）的 Markdown 源文件。
*   **版本化内容 (`/versioned_docs`):** 存放由 Docusaurus 命令自动生成的历史版本文档快照。
*   **国际化内容 (`/i18n`):** 存放所有翻译版本的文档及 UI 文本。
*   **构建流程:** 开发人员或 CI/CD 流程执行 `docusaurus build` 命令，框架会整合所有配置和内容源，生成一套纯静态的 HTML/CSS/JS 文件，最终部署到托管平台。

**2.2 目录结构设计**
为了清晰地组织内容并匹配需求，设计如下核心目录结构：

```
my-docs-center/
├── docs/                             # FR-1.1: 按产品线和产品组织
│   ├── digital-identity/
│   │   ├── eiam/                     # EIAM 产品文档
│   │   ├── ciam/                     # CIAM 产品文档
│   │   └── idaas/                    # IDaaS 产品文档
│   ├── zero-trust/
│   └── ai/
│
├── versioned_docs/                   # FR-2.1: 自动生成的版本化文档
│   └── version-eiam/                 # EIAM 的版本化内容
│       ├── version-6.0/
│       └── ...
│
├── i18n/                             # FR-3: 国际化内容
│   └── en/
│       ├── docusaurus-plugin-content-docs-eiam/
│       │   ├── current/              # EIAM 当前版本的英文翻译
│       │   └── version-6.0/          # EIAM 6.0 版本的英文翻译
│       └── ...
│
├── docusaurus.config.js              # 核心配置文件
├── sidebars-eiam.js                  # FR-1.4: EIAM 产品的侧边栏定义
├── sidebars-ciam.js                  # CIAM 产品的侧边栏定义
└── ...
```

---

#### **3. 详细模块设计**

**3.1 多产品架构实现 (满足 FR-1)**

此需求的核心是使用 **Docusaurus 文档插件实例 (Docs Plugin Instances)** 来实现。

*   **实现策略:** 在 `docusaurus.config.js` 的 `plugins` 数组中，为每一个独立的产品（EIAM, CIAM, IDaaS 等）配置一个 `@docusaurus/plugin-content-docs` 实例。
*   **配置示例 (`docusaurus.config.js`):**

    ```javascript
    plugins: [
      // EIAM 产品实例
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'eiam', // 唯一标识符，用于版本和i18n
          path: 'docs/digital-identity/eiam', // 源文件路径
          routeBasePath: 'docs/eiam', // URL 访问路径
          sidebarPath: require.resolve('./sidebars-eiam.js'), // 独立的侧边栏
        },
      ],
      // CIAM 产品实例
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'ciam',
          path: 'docs/digital-identity/ciam',
          routeBasePath: 'docs/ciam',
          sidebarPath: require.resolve('./sidebars-ciam.js'),
        },
      ],
      // ... 其他产品实例
    ],
    ```
*   **侧边栏设计 (FR-1.3, FR-1.4):** 每个产品实例通过 `sidebarPath` 链接到一个独立的侧边栏文件。在该文件中，使用 `category` 类型构建多级目录。

    ```javascript
    // sidebars-eiam.js
    module.exports = {
      mySidebar: [
        'intro',
        {
          type: 'category',
          label: '安装部署手册',
          items: ['installation/overview', 'installation/requirements'],
        },
        // ... 其他手册和层级
      ],
    };
    ```

**3.2 版本管理系统实现 (满足 FR-2)**

*   **多版本产品 (FR-2.1):** 对于需要版本管理的产品（如 EIAM），在其插件实例配置中添加 `versions` 块。

    ```javascript
    // 在 EIAM 插件配置中
    {
      id: 'eiam',
      path: 'docs/digital-identity/eiam',
      routeBasePath: 'docs/eiam',
      lastVersion: 'current', // 'current' 指向 path 目录
      versions: {
        current: {
          label: '7.0', // 当前开发版本对外显示的标签
        },
        '6.0': { // 已归档的版本
          label: '6.0',
        },
      },
    }
    ```
    *   **版本创建流程:** 当 7.0 版本需要归档时，执行命令 `npm run docusaurus docs:version:eiam 7.0`。Docusaurus 将自动处理文件复制和配置生成。

*   **单版本产品 (FR-2.2):** 对于无需版本管理的产品（如 IDaaS），其插件配置**不包含** `versions` 块。这将使其始终只展示 `path` 目录下的内容，且不显示版本切换下拉菜单。

**3.3 国际化 (i18n) 实现 (满足 FR-3)**

*   **配置激活:** 在 `docusaurus.config.js` 中配置 `i18n` 对象。

    ```javascript
    i18n: {
      defaultLocale: 'zh-Hans',
      locales: ['zh-Hans', 'en'],
      localeConfigs: {
        'zh-Hans': { label: '简体中文' },
        en: { label: 'English' },
      },
    },
    ```
*   **内容翻译:**
    *   运行 `npm run docusaurus write-translations` 来生成翻译文件模板。
    *   翻译人员将 Markdown 文件翻译后，放置在 `i18n/<locale>/docusaurus-plugin-content-docs-<pluginId>/` 目录下，并保持与源文件相同的相对路径。
    *   例如，EIAM 的 `docs/digital-identity/eiam/intro.md` 的英文翻译应放在 `i18n/en/docusaurus-plugin-content-docs-eiam/current/intro.md`。
*   **页面同步切换 (FR-3.3):** 此功能为 Docusaurus i18n 系统的**原生行为**。只要翻译文件存在于正确的路径下，框架内置的语言切换组件就会自动处理页面间的跳转。

#### **4. 内容与数据流**

1.  **内容创建/更新:** 文档工程师在本地 Git 仓库的 `/docs` 目录中，对应产品的文件夹下编写或修改 Markdown 文件。
2.  **内容翻译:** 翻译人员在 `/i18n` 目录中，对应语言和产品的文件夹下，创建或更新翻译文件。
3.  **版本发布:** 当一个版本需要发布归档时，项目管理员执行 `docs:version` CLI 命令。
4.  **代码提交:** 所有变更通过 Git 提交到中央代码仓库（如 GitHub）。
5.  **自动构建与部署 (CI/CD):** Git 提交触发 CI/CD 流水线。流水线执行 `npm install` 和 `npm run build`，生成 `/build` 目录下的静态文件。
6.  **部署上线:** 流水线将 `/build` 目录的内容部署到静态托管平台，完成发布。

#### **5. 可扩展性设计 (满足 NFR-1)**

本设计方案具备高度可扩展性：
*   **新增产品:** 只需在 `docusaurus.config.js` 中增加一个新的插件实例，创建对应的 `docs` 目录和 `sidebar` 文件即可。
*   **新增语言:** 只需更新 `i18n.locales` 配置，并创建新的语言目录 `i18n/<new-locale>`。
*   **新增版本:** 只需执行一次 `docs:version` 命令。

所有扩展操作均为配置或文件层面的增加，无需修改核心代码，将变更风险降至最低。