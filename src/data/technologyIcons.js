import { siBootstrap, siCss, siGit, siGithub, siHtml5, siJavascript, siMysql, siPhp, siReact, siTailwindcss, siVite, siWordpress } from 'simple-icons'

export const technologyIcons = {
  html: siHtml5,
  react: siReact,
  javascript: siJavascript,
  css: { ...siCss, hex: '1572B6' },
  tailwind: siTailwindcss,
  wordpress: siWordpress,
  php: siPhp,
  bootstrap: siBootstrap,
  git: siGit,
  github: { ...siGithub, hex: 'F4F4F2' },
  vite: siVite,
  mysql: siMysql,
}
