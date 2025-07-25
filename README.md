# CSS構造の説明

このプロジェクトのCSSは保守性向上のため、機能別に分割されています。

## ファイル構成

### 1. `base.css`
- CSS変数（カラーパレット、フォント設定）
- リセットスタイル
- body基本設定
- フッタースタイル

### 2. `layout.css`
- コンテナ・グリッドシステム
- セクション・レイアウト
- グリッドレイアウト設定

### 3. `components.css`
- ヘッダー・ナビゲーション
- ヒーローセクション
- カード型コンポーネント
- ボタン・フォーム

### 4. `pages.css`
- プロフィール・スキル・趣味ページ
- プロジェクト・愛車ページ
- ページ固有のスタイル

### 5. `responsive.css`
- タブレット対応（769px-1024px）
- モバイル対応（768px以下）
- 小画面対応（480px以下）

## 読み込み順序

HTMLの`<head>`内で以下の順序で読み込んでください：

```html
<!-- reset.css -->
<link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
<!-- 分割されたCSSファイル -->
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/pages.css">
<link rel="stylesheet" href="css/responsive.css">
```

## ファイル管理

- `style-original-backup.css`: 元の統合CSSファイル（バックアップ）
- `style-new.css`: @importを使用した統合ファイル（必要に応じて使用）

## メリット

1. **保守性向上**: 機能別に分かれているため、修正箇所が特定しやすい
2. **チーム開発**: 複数人で同時編集しやすい
3. **キャッシュ効率**: 変更されたファイルのみ再読み込み
4. **デバッグ**: 問題のあるスタイルの特定が容易
5. **再利用性**: コンポーネント単位での再利用が可能
