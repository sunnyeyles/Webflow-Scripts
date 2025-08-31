<section class="collection__section" data-section-id="{{ section.id }}">
  <h1 class="collection__title center">{{ collection.title }}</h1>
  <div class="collection-wrapper">
    <div class="collection-info collection-info--template">
      {%- if section.settings.show_collection_image and collection.image -%}
        <div class="collection-image-wrapper">
          <div class="collection-image-container">
            <img srcset="{% if collection.image.width >= 311 %}{{ collection.image | img_url: '311x' }} 311w,{% endif %}
                {% if collection.image.width >= 622 %}{{ collection.image | img_url: '622x' }} 622w,{% endif %}
                {% if collection.image.width >= 685 %}{{ collection.image | img_url: '685x' }} 685w,{% endif %}
                {% if collection.image.width >= 1370 %}{{ collection.image | img_url: '1370x' }} 1370w,{% endif %}
                {% if collection.image.width >= 1080 %}{{ collection.image | img_url: '1080x' }} 1080w,{% endif %}
                {% if collection.image.width >= 2160 %}{{ collection.image | img_url: '2160x' }} 2160w{% endif %}"
              sizes="(min-width: 1200px) 1080px, (min-width: 750px) calc(100vw - 8rem), calc(100vw - 6.4rem)"
              src="{{ collection.image | img_url: '1080x' }}"
              width="{{ collection.image.width }}"
              height="{{ collection.image.height }}"
              loading="lazy"
              class="media-cover"
              alt="{{ collection.title }}">
          </div>
        </div>
      {%- endif -%}

      {%- if collection.description != blank and section.settings.show_description -%}
        <div class="collection-description">
          <div class="rte">
            {{ collection.description }}
          </div>
        </div>
      {%- endif -%}
    </div>

    {%- paginate collection.products by 36 -%}
      <ul class="featured-collections__products collections__products grid grid--2-col-tablet">
      {%- for product in collection.products -%}
        <li class="featured-collections__item" data-view-more-item>
          {% render 'product-card-list', product: product, show_vendor: section.settings.show_vendor %}
        </li>
      {%- else -%}
        {%- if collection.handle == 'all' and collection.all_vendors.size == 0 and collection.all_types.size == 0 -%}
          {%- for i in (1..4) -%}
            <li class="featured-collections__item">
              {% render 'product-card-list', product: product %}
            </li>
          {%- endfor -%}
        {%- endif -%}
      {%- endfor -%}
      </ul>

      {%- if paginate.pages > 1 -%}
        {% render 'pagination', paginate: paginate %}
      {%- endif -%}
    {%- endpaginate -%}
  </div>
</section>

{% schema %}
{
  "name": {
    "cs": "Šablona kolekce",
    "da": "Kollektionsskabelon",
    "de": "Kategorievorlage",
    "en": "Collection template",
    "es": "Plantilla de colección",
    "fi": "Kokoelmamalli",
    "fr": "Modèle de collection",
    "it": "Modello per la collezione",
    "ja": "コレクションテンプレート",
    "ko": "컬렉션 템플릿",
    "nb": "Samlingsmal",
    "nl": "Template Collectie",
    "pl": "Wzorzec kolekcji",
    "pt-BR": "Modelo de coleção",
    "pt-PT": "Modelo de coleção",
    "sv": "Mall för produktserie",
    "th": "เทมเพลตคอลเลกชัน",
    "tr": "Koleksiyon şablonu",
    "vi": "Mẫu bộ sưu tập",
    "zh-CN": "产品系列模板",
    "zh-TW": "商品系列範本"
  },
  "settings": [
    {
      "type": "checkbox",
      "id": "show_collection_image",
      "label": {
        "cs": "Zobrazit obrázek kolekce",
        "da": "Vis kollektionsbillede",
        "de": "Kategoriebild anzeigen",
        "en": "Show collection image",
        "es": "Mostrar imagen de la colección",
        "fi": "Näytä kokoelman kuva",
        "fr": "Afficher l'image de la collection",
        "it": "Mostra immagine collezione",
        "ja": "コレクションの画像を表示する",
        "ko": "컬렉션 이미지 표시",
        "nb": "Vis samlingsbilde",
        "nl": "Collectieafbeelding weergeven",
        "pl": "Pokaż obraz kolekcji",
        "pt-BR": "Exibir imagem da coleção",
        "pt-PT": "Mostrar imagem da coleção",
        "sv": "Visa produktseriebild",
        "th": "แสดงรูปภาพคอลเลกชัน",
        "tr": "Koleksiyon görselini göster",
        "vi": "Hiển thị hình ảnh bộ sưu tập",
        "zh-CN": "显示产品系列图片",
        "zh-TW": "顯示商品系列圖片"
      },
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_description",
      "label": {
        "cs": "Zobrazit popis kolekce",
        "da": "Vis kollektionsbeskrivelse",
        "de": "Kategorienbeschreibung anzeigen",
        "en": "Show collection description",
        "es": "Mostrar descripción de la colección",
        "fi": "Näytä kokoelman kuvaus",
        "fr": "Afficher la description de la collection",
        "it": "Mostra descrizione collezione",
        "ja": "コレクションの説明を表示",
        "ko": "컬렉션 설명 표시",
        "nb": "Vis samlingsbeskrivelse",
        "nl": "Collectiebeschrijving weergeven",
        "pl": "Pokaż opis kolekcji",
        "pt-BR": "Exibir a descrição da coleção",
        "pt-PT": "Mostrar descrição da coleção",
        "sv": "Visa produktseriebeskrivning",
        "th": "แสดงคำอธิบายคอลเลกชัน",
        "tr": "Koleksiyon açıklamasını görüntüle",
        "vi": "Hiển thị mô tả bộ sưu tập",
        "zh-CN": "显示产品系列描述",
        "zh-TW": "顯示商品系列說明"
      },
      "default": false
    },
    {
      "type": "checkbox",
      "id": "show_vendor",
      "label": {
        "cs": "Zobrazit dodavatele produktů",
        "da": "Vis produktforhandlere",
        "de": "Produktanbieter anzeigen",
        "en": "Show product vendors",
        "es": "Mostrar proveedores del producto",
        "fi": "Näytä tuotteen myyjät",
        "fr": "Afficher les distributeurs de produits",
        "it": "Mostra fornitori prodotto",
        "ja": "商品の販売元を表示する",
        "ko": "제품 공급업체 표시",
        "nb": "Vis produktleverandører",
        "nl": "Productleveranciers weergeven",
        "pl": "Pokaż dostawców produktu",
        "pt-BR": "Exibir fabricantes dos produtos",
        "pt-PT": "Mostrar fornecedores dos produtos",
        "sv": "Visa produktförsäljare",
        "th": "แสดงผู้ขายสินค้า",
        "tr": "Ürün satıcılarını göster",
        "vi": "Hiển thị nhà cung cấp sản phẩm",
        "zh-CN": "显示产品厂商",
        "zh-TW": "顯示產品廠商"
      },
      "default": false
    }
  ]
}
{% endschema %}
