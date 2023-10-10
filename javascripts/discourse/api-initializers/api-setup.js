import { apiInitializer } from "discourse/lib/api";
import loadScript from "discourse/lib/load-script";
import I18n from "I18n";

async function applyInserted(element) {
  const inserted = element.querySelectorAll("ins");
  if (!inserted.length) {
    return;
  }
}

export default apiInitializer("0.11.1", (api) => {
  const { iconNode } = require("discourse-common/lib/icon-library");
  let icon = iconNode("highlighter");
  const currentLocale = I18n.currentLocale();
  // I18n.translations[currentLocale].js.inserted_button_title = I18n.t(themePrefix("composer_inserted_button_title"));
  // I18n.translations[currentLocale].js.composer.inserted_button_text = I18n.t(themePrefix("composer_inserted_button_text"));
  I18n.translations[currentLocale].js.inserted_button_title = "Inserted Text";
  I18n.translations[currentLocale].js.composer.this = "this";
  // I18n.translations[currentLocale].js.composer.inserted_button_text = "Inserted Text";

  api.modifyClass("controller:composer", {
    pluginId: "inserted",
    actions: {
      insertedButton() {
        this.get("toolbarEvent").applySurround("\n" + `<ins>` + "\n</ins>\n");
      },
    },
  });

  // add button to the toolbar
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "composer_inserted_button",
      group: "extras",
      icon: "highlighter",
      shortcut: "N",
      preventFocus: true,
      trimLeading: true,
      title: "inserted_button_title",
      // perform: e => e.applySurround('<span>[wrap=inserted]', '[/wrap]</span>', 'this')
      perform: (e) => e.applySurround("<ins>", "</ins>", "this"),
    });
  });

  api.decorateCookedElement(
    async (elem, helper) => {
      const id = helper ? `post_${helper.getModel().id}` : "composer";
      applyInserted(elem, id);
    },
    { id: "wrap-inserted" }
  );
});







async function applyDeleted(element) {
  const deleted = element.querySelectorAll("del");
  if (!deleted.length) {
    return;
  }
}

export default apiInitializer("0.11.1", (api) => {
  const { iconNode } = require("discourse-common/lib/icon-library");
  let icon = iconNode("highlighter");
  const currentLocale = I18n.currentLocale();
  // I18n.translations[currentLocale].js.deleted_button_title = I18n.t(themePrefix("composer_deleted_button_title"));
  // I18n.translations[currentLocale].js.composer.deleted_button_text = I18n.t(themePrefix("composer_deleted_button_text"));
  I18n.translations[currentLocale].js.deleted_button_title = "Deleted Text";
  I18n.translations[currentLocale].js.composer.this = "this";
  // I18n.translations[currentLocale].js.composer.deleted_button_text = "Deleted Text";

  api.modifyClass("controller:composer", {
    pluginId: "deleted",
    actions: {
      deletedButton() {
        this.get("toolbarEvent").applySurround("\n" + `<del>` + "\n</del>\n");
      },
    },
  });

  // add button to the toolbar
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "composer_deleted_button",
      group: "extras",
      icon: "highlighter",
      shortcut: "D",
      preventFocus: true,
      trimLeading: true,
      title: "deleted_button_title",
      // perform: e => e.applySurround('<span>[wrap=deleted]', '[/wrap]</span>', 'this')
      perform: (e) => e.applySurround("<del>", "</del>", "this"),
    });
  });

  api.decorateCookedElement(
    async (elem, helper) => {
      const id = helper ? `post_${helper.getModel().id}` : "composer";
      applyDeleted(elem, id);
    },
    { id: "wrap-deleted" }
  );
});
