# Videos Folder

Esta carpeta está preparada para almacenar videos del sitio web K Life Spa.

## Estructura de Carpetas

### `/videos/testimonials/`
Videos de testimonios de clientes satisfechos.
- Formato recomendado: MP4 (H.264)
- Resolución: 1920x1080 (Full HD) o 1280x720 (HD)
- Duración recomendada: 30-90 segundos

### `/videos/services/`
Videos demostrativos de los servicios ofrecidos.
- Muestra procedimientos de tratamientos faciales y corporales
- Formato recomendado: MP4 (H.264)
- Resolución: 1920x1080 (Full HD)

### `/videos/background/`
Videos ambientales para fondos o secciones hero.
- Videos en loop sin audio
- Formato recomendado: MP4 (H.264) o WebM
- Resolución: 1920x1080
- Duración: 10-30 segundos (para loop)

## Cómo Usar Videos en el Sitio

### Ejemplo básico de video:
```tsx
<video
  width="100%"
  height="auto"
  controls
  poster="/images/services/facial/hydrafacial.jpg"
>
  <source src="/videos/services/hydrafacial-demo.mp4" type="video/mp4" />
  Tu navegador no soporta el elemento de video.
</video>
```

### Ejemplo de video de fondo:
```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover"
>
  <source src="/videos/background/spa-ambience.mp4" type="video/mp4" />
</video>
```

## Especificaciones Técnicas

### Formatos Recomendados:
- **MP4 (H.264)**: Mejor compatibilidad entre navegadores
- **WebM (VP9)**: Mejor compresión, navegadores modernos

### Optimización:
- Usa compresión adecuada para web
- Considera múltiples resoluciones para diferentes dispositivos
- Implementa lazy loading para videos below-the-fold
- Agrega el atributo `preload="metadata"` para videos grandes

### Tamaño de Archivo:
- Mantén los videos bajo 10 MB cuando sea posible
- Para videos grandes, considera usar un servicio CDN externo como:
  - Cloudinary
  - Mux
  - Vimeo
  - YouTube (embebido)

## Notas Importantes

1. **Accesibilidad**: Siempre agrega subtítulos para videos con audio
2. **Performance**: Los videos grandes pueden afectar el tiempo de carga
3. **SEO**: Agrega descripciones y metadata apropiados
4. **Mobile**: Testa que los videos funcionen bien en dispositivos móviles

---

**Última actualización**: Octubre 2025
**Proyecto**: K Life Spa Website
