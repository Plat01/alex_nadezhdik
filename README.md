# «Надеждик»

Статическая главная: HTML, CSS и JavaScript, Node.js 22+, без runtime-зависимостей.

```sh
npm run dev
npm run check
npm run build
npm run preview
```

Локальный адрес — http://localhost:4173; порт меняется через `PORT`.
Сборка `dist/` создаётся из `index.html`, `src/` и `public/`.

## GitHub Pages

Репозиторий: https://github.com/Plat01/alex_nadezhdik.
Адрес сайта: https://plat01.github.io/alex_nadezhdik/.
Workflow `.github/workflows/pages.yml` проверяет, собирает и публикует `dist/`
после push в `redesign`; также доступен ручной запуск. В Pages используется
GitHub Actions. Относительные пути ресурсов поддерживают подпуть репозитория.

Серверной формы и CRM нет: обращения ведут в сообщения ВКонтакте, телефон
остаётся альтернативой. Условия занятий и права на материалы требуют
подтверждения согласно PRODUCT.md и реестру материалов.

Продуктовый контекст — [PRODUCT.md](PRODUCT.md), решения по дизайну —
[DESIGN.md](DESIGN.md), проверки реализации —
[отчёт](docs/research/homepage-2026-11-02/README.md).
