"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, Check, Copy, Trash2, Star, RefreshCw, Search, Sparkles, ExternalLink } from "lucide-react";

export default function MediaLibraryManager({ currentHeroImage, onHeroImageChange, showToast }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [autoSetHero, setAutoSetHero] = useState(false);
  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setMediaList(data.data);
      }
    } catch (err) {
      console.error("Failed to load media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("set_as_hero", autoSetHero ? "true" : "false");

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        showToast?.("Image uploaded to Media Library! 🖼️");
        if (autoSetHero && onHeroImageChange) {
          onHeroImageChange(data.data.url);
          showToast?.("Hero Banner updated successfully! 🌟");
        }
        fetchMedia();
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSetAsHero = async (mediaItem) => {
    try {
      if (onHeroImageChange) {
        onHeroImageChange(mediaItem.url);
      }

      // Save to settings API
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero_image_url: mediaItem.url }),
      });

      if (res.ok) {
        showToast?.(`"${mediaItem.name}" set as Homepage Hero Banner! 🌟`);
      }
    } catch (err) {
      console.error("Failed to set hero image:", err);
    }
  };

  const handleCopyUrl = (url, id) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      showToast?.("Image path copied to clipboard! 📋");
    }
  };

  const handleDelete = async (fileName) => {
    if (!confirm(`Are you sure you want to delete "${fileName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/media?filename=${encodeURIComponent(fileName)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast?.("Image deleted from Media Library 🗑️");
        fetchMedia();
      } else {
        alert("Cannot delete system default assets");
      }
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const filteredList = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <ImageIcon className="text-brand-blue" size={26} />
            Media & Images Library
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Upload, organize, and manage website images. Set any image as Homepage Hero Banner with 1-click.
          </p>
        </div>

        <button
          onClick={fetchMedia}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-brand-blue" : ""} />
          Refresh Media
        </button>
      </div>

      {/* Upload Drop Zone Card */}
      <div className="bg-slate-900 border-2 border-dashed border-slate-700 hover:border-brand-blue/70 rounded-3xl p-6 sm:p-8 transition-colors text-center relative overflow-hidden group">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFileUpload}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="h-16 w-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <UploadCloud size={32} />
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              {uploading ? "Uploading Image to Server..." : "Drop new images here, or click to browse files"}
            </p>
            <p className="text-xs text-slate-400 font-medium pt-1">
              Supports PNG, JPG, WEBP, SVG up to 10MB
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2 z-20" onClick={(e) => e.stopPropagation()}>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoSetHero}
                onChange={(e) => setAutoSetHero(e.target.checked)}
                className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
              />
              <span>Set as Homepage Hero Banner immediately after upload 🌟</span>
            </label>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search images by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-blue"
          />
        </div>

        <div className="text-xs font-semibold text-slate-400 self-end sm:self-auto">
          Showing <span className="text-white font-bold">{filteredList.length}</span> images
        </div>
      </div>

      {/* Visual Gallery Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs font-bold">
          Loading Media Library assets...
        </div>
      ) : filteredList.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/50 rounded-3xl border border-slate-800 space-y-2">
          <ImageIcon size={36} className="mx-auto text-slate-600" />
          <p className="text-sm font-bold text-slate-400">No images found</p>
          <p className="text-xs text-slate-500">Upload your first image using the drag & drop area above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredList.map((item) => {
            const isHeroActive = currentHeroImage === item.url || (item.name === "hero_professionals.png" && (!currentHeroImage || currentHeroImage.includes("hero_professionals")));

            return (
              <div
                key={item.id}
                className={`bg-slate-900 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-slate-700 shadow-lg group relative ${
                  isHeroActive ? "border-amber-400/80 shadow-amber-500/10 ring-1 ring-amber-400/50" : "border-slate-800"
                }`}
              >
                {/* Active Hero Banner Tag */}
                {isHeroActive && (
                  <div className="absolute top-2.5 left-2.5 z-10 bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star size={11} fill="currentColor" />
                    <span>Active Hero Banner</span>
                  </div>
                )}

                {/* Thumbnail Preview Area */}
                <div className="relative w-full h-44 bg-slate-950/70 overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Details & Actions Footer */}
                <div className="p-4 space-y-3 bg-slate-900/90 border-t border-slate-800/80">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white truncate" title={item.name}>
                      {item.name}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                      <span>{item.size}</span>
                      <span>{new Date(item.uploaded_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons Bar */}
                  <div className="pt-1 flex items-center gap-2">
                    {/* 1-Click Set as Hero */}
                    <button
                      onClick={() => handleSetAsHero(item)}
                      className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        isHeroActive
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/30 cursor-default"
                          : "bg-brand-blue hover:bg-blue-600 text-white shadow-xs"
                      }`}
                    >
                      {isHeroActive ? (
                        <>
                          <Check size={12} /> Current Hero
                        </>
                      ) : (
                        <>
                          <Sparkles size={12} /> Set as Hero
                        </>
                      )}
                    </button>

                    {/* Copy URL button */}
                    <button
                      onClick={() => handleCopyUrl(item.url, item.id)}
                      title="Copy Image Path"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
                    >
                      {copiedId === item.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    </button>

                    {/* Delete button (for uploaded files) */}
                    {item.url.startsWith("/uploads/") && (
                      <button
                        onClick={() => handleDelete(item.name)}
                        title="Delete Image"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer border border-slate-700/60"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
