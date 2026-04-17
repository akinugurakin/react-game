FROM python:3.12-slim AS base

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ---- Development ----
FROM base AS dev
# hot reload — kaynak kod bind mount ile gelir
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ---- Production ----
FROM base AS prod
COPY . .
RUN chmod +x start.sh
EXPOSE 8000
CMD ["./start.sh"]
