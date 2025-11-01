# 文档中心操作指南

本文档旨在为文档中心的开发人员和内容管理员提供操作指南，涵盖本地开发、打包部署以及文档管理的各个方面。

## 1. 开发指南

### 1.1. 环境准备

在开始之前，请确保您的开发环境满足以下要求：

*   **Node.js**: 建议安装 LTS (长期支持) 版本。
*   **Yarn**: Docusaurus 项目使用 Yarn 作为包管理器。如果尚未安装，请通过以下命令全局安装：
    ```bash
    npm install -g yarn
    ```

### 1.2. 本地开发

1.  **安装项目依赖**：
    在项目根目录下运行以下命令，安装所有必要的依赖包：
    ```bash
    yarn
    ```

2.  **启动本地开发服务器**：
    依赖安装完成后，运行以下命令启动本地开发服务器：
    ```bash
    yarn start
    ```
    此命令将会在您的默认浏览器中打开文档网站 (`http://localhost:3000`)。在开发过程中，对文档或代码的修改将会实时反映在浏览器中，无需手动刷新。

### 1.3. 类型检查

为了确保代码质量和类型安全，您可以运行 TypeScript 类型检查：

```bash
yarn typecheck
```

## 2. 打包部署

当您完成文档的编写和开发，并准备将其部署到生产环境时，可以执行以下命令生成静态网站文件：

```bash
yarn build
```

此命令将会在项目根目录下创建一个名为 `build` 的目录，其中包含所有生成的静态文件。您可以将此目录中的内容部署到任何静态文件托管服务上。

## 3. 文档管理

本节详细说明如何管理文档内容，包括新建产品线、产品、增加文档、国际化以及版本管理。

### 3.1. 项目结构概览

了解项目结构是有效管理文档的基础：

*   `docs/`: 存放所有产品的**当前版本**文档。每个子目录通常代表一个产品线或产品。
    *   `docs/digital-identity/`: 数字身份产品线。
        *   `docs/digital-identity/eiam/`: EIAM 产品文档。
        *   `docs/digital-identity/ciam/`: CIAM 产品文档。
        *   `docs/digital-identity/idaas/`: IDaaS 产品文档。
*   `eiam_versioned_docs/`: 存放 EIAM 产品的**历史版本**文档。例如，`eiam_versioned_docs/version-6.0/` 包含 6.0 版本的文档。
*   `eiam_versioned_sidebars/`: 存放 EIAM 产品的**历史版本**侧边栏配置文件。例如，`eiam_versioned_sidebars/version-6.0-sidebars.json`。
*   `i18n/`: 国际化文件目录。每个语言有一个子目录。
    *   `i18n/en/`: 英文翻译文件。
    *   `i18n/zh-Hans/`: 简体中文翻译文件 (如果已配置)。
*   `docusaurus.config.ts`: Docusaurus 的核心配置文件，定义了网站的元数据、插件、主题以及文档内容源等。
*   `sidebars-*.ts`: 各个产品或产品线的侧边栏配置文件，定义了文档的导航结构。

### 3.2. 新建产品线或产品

#### 新建产品线 (例如：`new-product-line`)

1.  **创建目录**：在 `docs/` 目录下创建新的产品线目录，例如 `docs/new-product-line/`。
2.  **配置 Docusaurus**：编辑 `docusaurus.config.ts` 文件，在 `plugins` 或 `presets` 部分添加新的内容插件配置。参考现有产品 (如 `eiam`, `ciam`, `idaas`) 的配置方式。
    *   `path`: 指向您新建的产品线目录，例如 `docs/new-product-line/`。
    *   `routeBasePath`: 定义该产品线在 URL 中的路径，例如 `/new-product-line/`。
    *   `sidebarPath`: 指向该产品线对应的侧边栏文件，例如 `sidebars-new-product-line.ts`。
3.  **创建侧边栏文件**：在项目根目录或适当位置创建 `sidebars-new-product-line.ts` 文件，并定义该产品线的导航结构。

#### 新建产品 (例如：在 `digital-identity` 产品线下新建 `new-product`)

1.  **创建目录**：在 `docs/digital-identity/` 目录下创建新的产品目录，例如 `docs/digital-identity/new-product/`。
2.  **配置 Docusaurus**：编辑 `docusaurus.config.ts` 文件，添加新的内容插件配置。
    *   `path`: 指向您新建的产品目录，例如 `docs/digital-identity/new-product/`。
    *   `routeBasePath`: 定义该产品在 URL 中的路径，例如 `/digital-identity/new-product/`。
    *   `sidebarPath`: 指向该产品对应的侧边栏文件，例如 `sidebars-new-product.ts`。
3.  **创建侧边栏文件**：创建 `sidebars-new-product.ts` 文件，并定义该产品的导航结构。
4.  **创建初始文档**：在该产品目录下创建 `intro.md` 或其他 Markdown/MDX 文件作为产品的起始文档。

### 3.3. 对产品增加文档

1.  **定位文档目录**：找到您希望添加文档的产品目录 (例如 `docs/digital-identity/eiam/`)。
2.  **创建文档文件**：在该目录下创建新的 Markdown (`.md`) 或 MDX (`.mdx`) 文件，并编写内容。
3.  **更新侧边栏**：编辑对应产品的侧边栏文件 (例如 `sidebars-eiam.ts`)，将新文档的 ID (通常是文件名，不含扩展名) 添加到导航结构中，以便用户可以访问到它。

### 3.4. 产品文档国际化

Docusaurus 支持多语言。以下是进行文档国际化的步骤：

1.  **提取翻译文本**：
    运行以下命令，Docusaurus 会自动提取需要翻译的文本并生成 JSON 文件：
    ```bash
    yarn write-translations
    ```
    这些 JSON 文件通常位于 `i18n/<locale>/docusaurus-plugin-content-docs-<plugin-id>/` 目录下，例如 `i18n/zh-Hans/docusaurus-plugin-content-docs-eiam/current.json`。

2.  **翻译内容**：
    *   **Markdown/MDX 文档**：在 `i18n/zh-Hans/` 目录下，根据英文文档的路径结构，创建对应的中文文档文件，并翻译其内容。例如，如果英文文档是 `docs/digital-identity/eiam/intro.md`，则中文翻译文件应为 `i18n/zh-Hans/docusaurus-plugin-content-docs-eiam/current/intro.md`。
    *   **JSON 翻译文件**：打开 `i18n/zh-Hans/` 目录下生成的 JSON 文件，翻译其中的键值对。

3.  **配置 Docusaurus**：确保 `docusaurus.config.ts` 文件中的 `i18n` 配置部分包含了 `zh-Hans` 语言，以便 Docusaurus 能够识别并加载中文翻译。

### 3.5. 产品增加版本 (以 EIAM 为例)

Docusaurus 的版本管理功能允许您维护不同版本的文档。

1.  **创建新版本**：
    运行 Docusaurus 命令来创建一个新版本。例如，为 EIAM 产品创建 7.0 版本：
    ```bash
    npx docusaurus docs:version eiam 7.0
    ```
    执行此命令后，Docusaurus 会执行以下操作：
    *   将当前 `docs/digital-identity/eiam/` 目录下的所有文档复制到 `eiam_versioned_docs/version-7.0/` 目录中。
    *   生成对应的版本侧边栏文件，例如 `eiam_versioned_sidebars/version-7.0-sidebars.json`。
    *   更新 `eiam_versions.json` 文件，记录新的版本信息。

2.  **更新当前版本文档**：
    在创建新版本后，`docs/digital-identity/eiam/` 目录将代表最新的、正在开发中的版本 (通常被称为 "next" 或 "unversioned" 版本)。您可以在此目录下继续添加和修改文档，这些更改将构成未来的新版本内容。

3.  **管理版本侧边栏**：
    每个版本都有其独立的侧边栏配置。如果您需要修改特定历史版本的导航结构，请编辑 `eiam_versioned_sidebars/version-<version-number>-sidebars.json` 文件。