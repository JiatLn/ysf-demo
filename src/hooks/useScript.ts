export const useScript = (id: string, url: string) => {
  const el = document.getElementById(id);
  if (el) return;
  const script = document.createElement('script');
  script.id = id;
  script.src = url;
  document.body.appendChild(script);
};
